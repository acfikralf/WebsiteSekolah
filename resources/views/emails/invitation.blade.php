<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Undangan Admin</title>
</head>
<body style="margin:0; padding:0; background:#f1f5f9; font-family: 'Inter', Arial, sans-serif; color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f5f9; padding: 32px 16px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.05);">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #064E3B 0%, #0C5D47 100%); padding: 32px; text-align: center;">
                            <h1 style="margin:0; color:#ffffff; font-size:22px; font-weight:700; font-family: 'Poppins', Arial, sans-serif;">
                                SMP Islam Watestanjung
                            </h1>
                            <p style="margin:8px 0 0; color:#FCD985; font-size:13px;">
                                Unggul dalam Prestasi, Berakhlak Mulia
                            </p>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px 32px;">
                            <h2 style="margin:0 0 16px; color:#064E3B; font-size:20px; font-weight:600; font-family: 'Poppins', Arial, sans-serif;">
                                Undangan Bergabung sebagai Admin
                            </h2>

                            <p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:#334155;">
                                Assalamu'alaikum warahmatullahi wabarakatuh,
                            </p>

                            <p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:#334155;">
                                Anda diundang untuk bergabung sebagai <strong>Administrator</strong> website SMP Islam Watestanjung. Klik tombol di bawah ini untuk mengaktifkan akun Anda dan membuat password.
                            </p>

                            <div style="text-align:center; margin:32px 0;">
                                <a href="{{ $url }}" style="display:inline-block; background:#064E3B; color:#ffffff; text-decoration:none; padding:14px 32px; border-radius:12px; font-weight:600; font-size:15px;">
                                    Aktifkan Akun Saya
                                </a>
                            </div>

                            <p style="margin:0 0 8px; font-size:13px; color:#64748b;">
                                Atau salin tautan berikut ke browser Anda:
                            </p>
                            <p style="margin:0 0 24px; font-size:13px; word-break:break-all; color:#0f172a;">
                                <a href="{{ $url }}" style="color:#0C5D47;">{{ $url }}</a>
                            </p>

                            <div style="background:#FFF8EB; border-left:4px solid #F59E0B; padding:16px; border-radius:8px; margin-bottom:24px;">
                                <p style="margin:0; font-size:13px; color:#92400e; line-height:1.6;">
                                    ⏰ Tautan ini berlaku selama <strong>3 hari</strong> sejak email ini dikirim.
                                    Jika sudah kedaluwarsa, minta admin lain untuk mengirim ulang undangan.
                                </p>
                            </div>

                            <p style="margin:0; font-size:13px; color:#64748b; line-height:1.6;">
                                Jika Anda tidak merasa diundang, abaikan saja email ini.
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background:#f8fafc; padding: 20px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <p style="margin:0; font-size:12px; color:#94a3b8;">
                                © {{ date('Y') }} SMP Islam Watestanjung. All Rights Reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>