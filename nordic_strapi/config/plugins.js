
module.exports = ({ env }) => ({
    // ...
    email: {
      provider: env('EMAIL_PROVIDER'),
      providerOptions: {
        
            sendinblue_api_key: env('SIB_API_KEY'),
            sendinblue_default_replyto: env('EMAIL_ADDRESS_REPLY', 'contact@example.com'),
            sendinblue_default_from: env('EMAIL_ADDRESS_FROM', 'no-reply@example.com'),
            sendinblue_default_from_name: env('SIB_DEFAULT_FROM_NAME', 'Sender Name'),
        
        host: env('EMAIL_SMTP_HOST', 'smtp.example.com'),
        port: env('EMAIL_SMTP_PORT', 587),
        auth: {
          user: env('EMAIL_SMTP_USER'),
          pass: env('EMAIL_SMTP_PASS'),
        },
      },
      settings: {
        defaultFrom: env('EMAIL_ADDRESS_FROM'),
        defaultReplyTo: env('EMAIL_ADDRESS_REPLY'),
        
      },
    },
    upload: {
        breakpoints: {
          xlarge: 1920,
          large: 1000,
          medium: 750,
          small: 500,
          xsmall: 64
        }
      },
    // ...
  })

 