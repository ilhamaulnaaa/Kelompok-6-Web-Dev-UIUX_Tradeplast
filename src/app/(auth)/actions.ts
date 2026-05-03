'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    redirect('/login?error=Invalid credentials');
  }

  redirect('/dashboard');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    redirect('/register?error=' + encodeURIComponent(error.message));
  }

  redirect('/login?message=Check your email to confirm registration');
}

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();
  redirect('/login');
}

export async function submitDeposit(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const categoryId = formData.get('categoryId') as string;
  const amount = parseFloat(formData.get('amount') as string);

  // Ambil data kategori plastik
  const { data: category } = await supabase
    .from('plastic_categories')
    .select('*')
    .eq('id', categoryId)
    .single();

  if (!category) {
    return { error: "Kategori tidak ditemukan" };
  }

  const totalEarned = Math.round(
    amount * category.price_per_unit
  );

  // Ambil profile user
  let { data: profile, error: fetchError } = await supabase
    .from('profiles')
    .select('balance')
    .eq('id', user.id)
    .single();

  // Jika profile belum ada → buat otomatis
  if (fetchError || !profile) {
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        balance: 0
      })
      .select()
      .single();

    if (createError) {
      return {
        error: "Gagal menyelaraskan profil saldo."
      };
    }

    profile = newProfile;
  }

  // Simpan deposit
  const { error: depositError } = await supabase
    .from('deposits')
    .insert({
      user_id: user.id,
      category_id: category.id,
      amount_submitted: amount,
      total_earned: totalEarned
    });

  if (depositError) {
    return {
      error: "Gagal mencatat transaksi deposit."
    };
  }

  await supabase
    .from('transaction_history')
    .insert({
      user_id: user.id,
      type: 'deposit',
      title: `Setor Plastik ${category.code}`,
      amount: totalEarned
    });

  // Update saldo user
  const newBalance =
    (profile?.balance || 0) + totalEarned;

  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      balance: newBalance
    })
    .eq('id', user.id);

  if (updateError) {
    return {
      error: "Gagal memperbarui saldo."
    };
  }

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/wallet');
  revalidatePath('/dashboard/history');

  redirect('/dashboard/deposit/success');
}

export async function addBankAccount(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Sesi berakhir, silakan login ulang."
    };
  }

  const { error } = await supabase
    .from('bank_accounts')
    .insert({
      user_id: user.id,
      bank_name: formData.get('bank_name') as string,
      account_number: formData.get('account_number') as string,
      account_holder: formData.get('account_holder') as string
    });

  if (error) {
    return {
      error: "Gagal menyimpan rekening."
    };
  }

  revalidatePath('/dashboard/wallet');

  return {
    success: "Rekening berhasil ditambahkan!"
  };
}

export async function withdrawBalance(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: "Sesi berakhir, silakan login ulang."
    };
  }

  const amount = parseInt(
    formData.get('amount') as string
  );

  // Ambil saldo user
  const { data: profile } = await supabase
    .from('profiles')
    .select('balance')
    .eq('id', user.id)
    .single();

  if (!profile || profile.balance < amount) {
    return {
      error: "Saldo kamu tidak mencukupi."
    };
  }

  const newBalance = profile.balance - amount;

  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      balance: newBalance
    })
    .eq('id', user.id);

  if (updateError) {
    return {
      error: "Terjadi kesalahan saat memproses saldo."
    };
  }

  await supabase
    .from('transaction_history')
    .insert({
      user_id: user.id,
      type: 'withdraw',
      title: 'Tarik Dana',
      amount: amount
    });

  revalidatePath('/dashboard/wallet');
  revalidatePath('/dashboard/history');

  return {
    success: "Penarikan berhasil! Saldo telah dikurangi."
  };
}