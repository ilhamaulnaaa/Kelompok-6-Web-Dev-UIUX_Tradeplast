'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod'; // Task 2: Import Zod [cite: 87]

// --- VALIDATION SCHEMAS [cite: 23, 88] ---
const DepositSchema = z.object({
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  amount: z.number().positive("Jumlah harus lebih dari 0"),
});

const BankAccountSchema = z.object({
  bank_name: z.string().min(2, "Nama bank minimal 2 karakter"),
  account_number: z.string().min(5, "Nomor rekening minimal 5 digit"),
  account_holder: z.string().min(3, "Nama pemilik minimal 3 karakter"),
});

// --- AUTH FUNCTIONS (Fixed missing exports) ---

export async function login(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  
  if (error) {
    redirect('/login?error=Invalid credentials');
  }

  redirect('/dashboard');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signUp({ email, password });
  
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

// --- TRANSACTION FUNCTIONS ---

export async function submitDeposit(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Task 2: Gunakan safeParse untuk validasi [cite: 24, 89]
  const validatedFields = DepositSchema.safeParse({
    categoryId: formData.get('categoryId'),
    amount: parseFloat(formData.get('amount') as string),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors.amount?.[0] || "Data tidak valid" };
  }

  const { categoryId, amount } = validatedFields.data;

  const { data: category } = await supabase
    .from('plastic_categories')
    .select('*')
    .eq('id', categoryId)
    .single();

  if (!category) return { error: "Kategori tidak ditemukan" };

  const totalEarned = Math.round(amount * category.price_per_unit);

  // Defensive Logic: Cek Profile
  let { data: profile, error: fetchError } = await supabase
    .from('profiles')
    .select('balance')
    .eq('id', user.id)
    .single();

  if (fetchError || !profile) {
    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert({ id: user.id, balance: 0 })
      .select().single();

    if (createError) return { error: "Gagal menyelaraskan profil saldo." };
    profile = newProfile;
  }

  // Simpan Deposit
  const { error: depositError } = await supabase.from('deposits').insert({
    user_id: user.id,
    category_id: category.id,
    amount_submitted: amount,
    total_earned: totalEarned
  });

  if (depositError) return { error: "Gagal mencatat transaksi deposit." };

  // Catat History
  await supabase.from('transaction_history').insert({
    user_id: user.id,
    type: 'deposit',
    title: `Setor Plastik ${category.code}`,
    amount: totalEarned
  });

  // Update Saldo
  const newBalance = (profile?.balance || 0) + totalEarned;
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ balance: newBalance })
    .eq('id', user.id);

  if (updateError) return { error: "Gagal memperbarui saldo." };

  revalidatePath('/dashboard');
  revalidatePath('/dashboard/wallet');
  revalidatePath('/dashboard/history');
  redirect('/dashboard/deposit/success');
}

export async function addBankAccount(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Sesi berakhir, silakan login ulang." };

  // Task 2: Validasi input bank [cite: 21, 85]
  const validatedFields = BankAccountSchema.safeParse({
    bank_name: formData.get('bank_name'),
    account_number: formData.get('account_number'),
    account_holder: formData.get('account_holder'),
  });

  if (!validatedFields.success) return { error: "Data bank tidak valid" };

  const { error } = await supabase.from('bank_accounts').insert({
    user_id: user.id,
    ...validatedFields.data
  });

  if (error) return { error: "Gagal menyimpan rekening." };

  revalidatePath('/dashboard/wallet');
  return { success: "Rekening berhasil ditambahkan!" };
}

export async function withdrawBalance(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Sesi berakhir, silakan login ulang." };

  const amount = parseInt(formData.get('amount') as string);

  const { data: profile } = await supabase
    .from('profiles')
    .select('balance')
    .eq('id', user.id)
    .single();

  if (!profile || profile.balance < amount) {
    return { error: "Saldo kamu tidak mencukupi." };
  }

  const newBalance = profile.balance - amount;
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ balance: newBalance })
    .eq('id', user.id);

  if (updateError) return { error: "Terjadi kesalahan saat memproses saldo." };

  await supabase.from('transaction_history').insert({
    user_id: user.id,
    type: 'withdraw',
    title: 'Tarik Dana',
    amount: amount
  });

  revalidatePath('/dashboard/wallet');
  revalidatePath('/dashboard/history');

  return { success: "Penarikan berhasil! Saldo telah dikurangi." };
}