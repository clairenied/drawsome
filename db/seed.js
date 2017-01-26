
const db = require('APP/db')
const models = require('APP/db/models')

const seedDrawing = () =>db.Promise.map([
  {
    name: 'mosswall',
    type: 'masterpiece',
    likes: 1000

  },
  {
     name: 'circlepainting',
    type: 'masterpiece',
    likes: 1
  },
], masterpiece => models.Drawing.create(masterpiece
  )
)

// const seedUsers = () => db.Promise.map([

//   {firstName: 'Barack', lastName: 'Barack', email: 'barack@example.gov', phone_number: 8005555555, account_type: 'administrator', password: '5678', address: {
//         street_address: 'Trump House Dr.', unit_number: '0', city: 'Washington D.C.', state: 'DC', zipcode: '99999', comments: "get me outta here", delivery_contact_number: '312456789', delivery_contact_name: "Michelle", delivery_address_type: 'business', security: true
//       }, subscription: {
//         frequency: ["9:00 am", null, null, null, null, null, "8:00 am"], completed: true
//       }},
//   {name: 'Hal Carleton', email: 'Hal@javaScription.com', phone_number: 1234567890, account_type: 'administrator', password: 'comet', address: {
//         street_address: '123 Coffee drive', unit_number: '100', city: 'Chicago', state: 'IL', zipcode: '60601', comments: "wake me up before you go go", delivery_contact_number: '312456789', delivery_contact_name: "Hal", delivery_address_type: 'business'
//       }, subscription: {
//         frequency: ["5:30 am", "5:00 am", null, null, null, "7:30 am", "6:00 am"], completed: true
//       }},
//   {name: 'Alan Herman', email: 'Herm@javaScription.com', phone_number: 0987654321, account_type: 'administrator', password: 'idontdrinkcoffee', address: {
//         street_address: '988 Coca-Cola lane', unit_number: '1000000000', city: 'Chicago', state: 'IL', zipcode: '60601', comments: "cafeine", delivery_contact_number: '312456789', delivery_contact_name: "Alan", delivery_address_type: 'home'
//       }, subscription: {
//         frequency: [null, "7:00 am", null, null, null, null, "10:15 am"], completed: true
//       }},
//   {name: 'Waseem Karim', email: 'Waseem@javaScription.com', phone_number: 800123456, account_type: 'administrator', password: 'ilovecoffee', address: {
//         street_address: '12 merchandise lane', unit_number: '1871', city: 'Chicago', state: 'IL', zipcode: '60601', comments: "talk to zeke", delivery_contact_number: '312456789', delivery_contact_name: "Zeke", delivery_address_type: 'business'
//       }, subscription: {
//         frequency: [null, null, "6:00 am", null, null, true, "5:00 am"], completed: true
//       }},
//   {name: 'Danielle Katz', email: 'Katz@javaScription.com', phone_number: 312456789, account_type: 'administrator', password: 'ialsolovecoffee', 
//     address: {
//         street_address: '123 1871 Dr.', unit_number: '1', city: 'Chicago', state: 'IL', zipcode: '60601', comments: "just kick down the door", delivery_contact_number: '312456789', delivery_contact_name: "Danielle", delivery_address_type: 'business'
//       }, subscription: {
//         frequency: [null, null, null, null, null, null, "7:00 am"], completed: true
//       }},

//   ], user => db.model('users').create(user, {include:[{model: models.Address, as: 'billing_address'}, {model: models.Subscription, as: 'subscription'}]}))

// const seedTiers = () => db.Promise.map([
//   {name: 'Good', description: 'This is our base coffee.  Its super untasty and super cheap!!! Almost like dirt!', costpercup: 100, costperpound: 1500, id: 1,
//     products: [
//       {photo: '/CoffeePics/Danielles_dark.jpg', roast: 'dark', name: "Danielle's Dark", region: 'Antarctica', description: 'Wing picked by penguins who are paid a slaves wage!  Extra flavor added by deisel leaks from our 70 year old supertanker.'},
//       {photo: '/CoffeePics/Alans_dirt.jpg', roast: 'extra dark', name: "Alan's Dirt", region: 'Sahara desert', description: 'Our coffee is grown in one of the driest, hottest, most inhospitable place in the world.  This gives our coffee extra flavor because the beans lack proper hydration.  Also, you can still taste the sand, which is awesome!'},
//       {photo: '/CoffeePics/Waseems_worst.jpg', roast: 'light', name: "Waseem's Worst", region: "Macedonia", description: "This coffee is almost as fake as the news that our 16 year old internet trolls make up.  You'll love the fake taste and fake smell!"},
//       {photo: '/CoffeePics/Trumps_tremendous.jpg', roast: 'medium', name: "Trumps's Tremendous, Winning, Terrific, YYYUUUUGGGGGEEEEE coffee", region: "Afghanistan", description: "This coffee tastes like crap, but it'll make you feel super good! Better than you've ever felt before. A mixed blend of coffee beans and a local seed grown in the south of the country.  In fact, it doesn't taste anything like coffee..... Now that I think about it, this might be opium....."},
//       {photo: '/CoffeePics/Hals_comet.jpg', roast: 'medium', name: "Hal's Comet", region: "Ort Cloud", description: "Pretty much tastes like ice and dust particles.... Coffee doesn't grow well this far from the sun."},
//       {photo: '/CoffeePics/Obamas_awful.jpg', roast: 'medium', name: "Obama's Awfulness", region: "Northern Canada", description: "Coffee doesn't grow in Northern Canada.  So this is actually a brew of things I just found lying on the ground in the Yukon region.  Enjoy!!"}
//     ]
//   },
//   {name: 'Better', description: 'This is our good coffee.  Its a great balance between taste and still having the funds to put your child through high school.', costpercup: 250, costperpound: 2500, id: 2,
//     products: [
//       {photo: '/CoffeePics/Danielles_light.jpg', roast: 'light', name: "Danielle's Light", region: 'Brazil', description: "This coffee will make you want to do the samba!! And with the money you'll save, you could actully vacation to carnival to show off your skills."},
//       {photo: '/CoffeePics/Alans_notsoawful.jpg', roast: 'medium', name: "Alan's not so Awful", region: "Detroit", description: "All the vacant lots make this an ideal place for agriculture!"},
//       {photo: '/CoffeePics/Waseems_medium.jpg', roast: 'medium', name: "Waseem's Medium Roast, Medium Taste", region: "South Florida", description: "This coffee is grown right here in the USA near Miami.  Once global warming ramps up, South Florida will be under water, so this is only available for a limited time.  Get it while it's (the earth) is cold!"},
//       {photo: '/CoffeePics/Hals_relativity.jpg', roast: 'super dark', name: "Hal's Relativity", region: "Cygnus X-1", description: "This coffee is from outter space! We transport it directly from the black hole Cygnus X-1 through a cosmic wormhole.  If you dont like the taste, who cares??? It's from spaaaaccceeeee!"},
//       {photo: '/CoffeePics/Obamas_unemployed.jpg', roast: 'dark', name: "Obamas's Unemployed", region: "South Side", description: "I need a job... Is anyone hiring? Please? I have two kids I am trying to put through Harvard!"}
//     ]
//   },
//   {name: 'Best', description: "This is our best coffee.  The tastes are amazing, but you may have to sell your second born.  That's no big deal, though because we all know your first born is your favorite.", costpercup: 400, costperpound: 3500, id: 3,
//     products: [
//       {photo: '/CoffeePics/Danielles_medium.jpg', roast: 'medium', name: "Danielle's Medium", region: 'India', description: "This amazing coffee is just right!  Its the goldilocks of coffee.  Thankfully, you won't have to worry about bears."},
//       {photo: '/CoffeePics/Alans_amazingness.jpg', roast: 'light', name: "Alan's Amazingness", region: "Indonesia", description: "Holy crap this stuff is amazing!  You haven't lived until you've had Alan's Amazingness.  Seriously.... what're you doing with your life?"},
//       {photo: '/CoffeePics/Waseems_good.jpg', roast: 'dark', name: "Waseem's Good Stuff", region: "Peru", description: "Peruvian coffee at it's best.  Grown on the slopes of Machu Pichu.  We climbed up there ourselves so we can confidently declare that this coffee is one of the seven wonders of the world"},
//       {photo: '/CoffeePics/Hals_supernova.jpg', roast: 'super light', name: "Hal's Supernova", region: "Milky Way", description: "Coffee with an extraordinary explosive taste.  Seriously, it'll blow your mind"},
//       {photo: '/CoffeePics/Obamas_cares.jpg', roast: 'light', name: "Obama Cares", region: "Hawaii", description: "Coffee from the place of my birth (allegedly).  I care about this coffee so much that I am enacting a tax if you DON'T drink it."}
//     ]
//   }
// ], tier => models.Tier.create(tier, {include:[{
//       model: models.Product
//       }]
//     }
//   )
// )





db.didSync
  .then(() => db.sync({force: true}))
  .then(seedDrawing)
  .catch(error => console.error(error))
  .finally(() => db.close())
