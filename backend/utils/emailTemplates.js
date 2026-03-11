function getVerificationTemplate(link, userName) {
  return {
    subject: 'Confirme ton email SunuMarket',
    html: `<h2>Bonjour ${userName}</h2><p>Merci pour ton inscription sur SunuMarket.</p><p><a href="${link}">Clique ici pour confirmer ton email</a></p><p>À très vite sur notre marché en ligne pensé pour le Sénégal.</p>`
  };
}

function getApprovalTemplate(userName) {
  return {
    subject: 'Ton compte SunuMarket est validé',
    html: `<h2>Bienvenue ${userName}</h2><p>Ton compte SunuMarket a été validé par l’administrateur. Tu peux maintenant te connecter et commander en ligne.</p>`
  };
}

function getResetTemplate(link, userName) {
  return {
    subject: 'Réinitialisation de mot de passe SunuMarket',
    html: `<h2>Bonjour ${userName}</h2><p><a href="${link}">Clique ici pour choisir un nouveau mot de passe</a></p><p>Si tu n’es pas à l’origine de cette demande, ignore simplement ce message.</p>`
  };
}

module.exports = { getVerificationTemplate, getApprovalTemplate, getResetTemplate };
