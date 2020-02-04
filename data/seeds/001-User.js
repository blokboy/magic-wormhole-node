/*
  Here is where we define the seeds for the DB which will be shell users that we play with to 
  test the application functionality.
*/
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Users')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert([
        {
	  id: 1, 
	  confirmed: false,
	  first_name: "Randy",
	  last_name: "Orton",
	  email: "r.orton@ymail.com",
	  password: "randyorton",
	},
        {
	  id: 2, 
          confirmed: true,
	  first_name: "John",
	  last_name: "Cena",
 	  email: "j.cena@gmail.com",
          password: "johncena"
	},
        {
	  id: 3, 
	  confirmed: true,
	  first_name: "HHH",
 	  last_name: "CEO",
	  email: "HHH@gmail.com",
          password: "HHH"
        }
      ]);
    });
};
