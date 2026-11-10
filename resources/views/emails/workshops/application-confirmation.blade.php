<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light">
    <title>Application received: {{ $workshop->title }}</title>
</head>
<body style="margin:0; padding:0; background-color:#f1f5f9; color:#0f172a; font-family:Arial, Helvetica, sans-serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
        Your application to {{ $workshop->title }} has been received by EXER.
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f1f5f9;">
        <tr>
            <td align="center" style="padding:32px 16px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px; overflow:hidden; background-color:#ffffff; border:1px solid #e2e8f0; border-radius:16px;">
                    <tr>
                        <td align="center" style="padding:28px 32px; border-top:5px solid #00a99d; background-color:#0d3976;">
                            <img src="{{ $logoUrl }}" width="72" height="72" alt="EXER Healthtech Consulting" style="display:block; width:72px; height:72px; border:0; border-radius:12px; background-color:#ffffff;">
                            <p style="margin:12px 0 0; color:#ffffff; font-size:12px; font-weight:bold; letter-spacing:2px; text-transform:uppercase;">
                                EXER Healthtech Consulting
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:36px 32px 20px;">
                            <p style="margin:0 0 12px; color:#00a99d; font-size:12px; font-weight:bold; letter-spacing:1.5px; text-transform:uppercase;">
                                Application received
                            </p>
                            <h1 style="margin:0 0 18px; color:#0d3976; font-size:26px; line-height:1.3;">
                                {{ $workshop->title }}
                            </h1>
                            <p style="margin:0 0 16px; color:#334155; font-size:16px; line-height:1.7;">
                                Hi {{ $applicant->full_name }}, we’ve received your application for this workshop. Thank you for your interest in learning and building with EXER.
                            </p>
                            <p style="margin:0 0 24px; color:#334155; font-size:16px; line-height:1.7;">
                                Our team will review your application and contact you at this email address with an update and any next steps.
                            </p>
                            {{-- <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 24px; background-color:#f0fdfa; border-left:4px solid #00a99d;">
                                <tr>
                                    <td style="padding:16px 18px;">
                                        <p style="margin:0 0 5px; color:#0d3976; font-size:13px; font-weight:bold;">A quick note</p>
                                        <p style="margin:0; color:#334155; font-size:14px; line-height:1.6;">
                                            This email confirms that we received your application. It does not confirm admission or reserve a place in the workshop.
                                        </p>
                                    </td>
                                </tr>
                            </table> --}}
                            {{-- <p style="margin:0; color:#334155; font-size:15px; line-height:1.7;">
                                If you have a question in the meantime, reply to this email and our team will be glad to help.
                            </p> --}}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:20px 32px 28px; border-top:1px solid #e2e8f0;">
                            <p style="margin:0 0 6px; color:#0d3976; font-size:14px; font-weight:bold;">The EXER team</p>
                            <p style="margin:0; color:#64748b; font-size:12px; line-height:1.6;">
                                User experience for better digital health.<br>
                                <a href="https://exer-htc.com" style="color:#00a99d; text-decoration:none;">exer-htc.com</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
