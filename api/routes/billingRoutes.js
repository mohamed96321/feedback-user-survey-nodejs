const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const isAuth = require('../middleware/is-auth');

module.exports = app => {
  app.post('/api/stripe', isAuth, async (req,res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: 'Pay $5 for 5 email credits',
      source: req.body.id
    });
    
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};