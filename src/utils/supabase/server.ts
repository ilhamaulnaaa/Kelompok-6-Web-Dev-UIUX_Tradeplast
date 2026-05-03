import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  // DI SINI KUNCINYA: Harus pakai await karena cookies() sekarang async
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          // Sekarang cookieStore dijamin sudah ada isinya
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Catch ini perlu karena Server Component tidak selalu bisa set cookie
            // Biasanya ditangani oleh middleware untuk refresh session
          }
        },
      },
    }
  )
}