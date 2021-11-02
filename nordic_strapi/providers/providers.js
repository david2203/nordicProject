module.exports = ({ env }) => ({
  // ...
  email: {
    provider: 'sendinblue',
    providerOptions: {
      apiKey: env('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'),
    },
    settings: {
      defaultFrom: 'david.saupe@gmail.com',
      defaultReplyTo: 'david.saupe@gmail.com',
      testAddress: 'david.saupe@gmail.com',
    },
  },
  // ...
});