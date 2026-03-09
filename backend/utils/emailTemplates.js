function getVerificationTemplate(link, userName) {
  return {
    subject: 'Confirme ton email VentePro',
    html: `<h2>Bonjour ${userName}</h2><p>Merci pour ton inscription.</p><p><a href="${link}">Clique ici pour confirmer ton email</a></p>`
  };
}

function getApprovalTemplate(userName) {
  return {
    subject: 'Ton compte VentePro est validé',
    html: `<h2>Bienvenue ${userName}</h2><p>Ton compte a été validé par l’administrateur. Tu peux maintenant te connecter.</p>`
  };
}

function getResetTemplate(link, userName) {
  return {
    subject: 'Réinitialisation de mot de passe',
    html: `<h2>Bonjour ${userName}</h2><p><a href="${link}">Clique ici pour choisir un nouveau mot de passe</a></p>`
  };
}

module.exports = { getVerificationTemplate, getApprovalTemplate, getResetTemplate };
