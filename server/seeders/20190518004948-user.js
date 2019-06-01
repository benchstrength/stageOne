'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "tedEncyclopaedia@himym.com",
        firstName: "Ted",
        lastName: "Mosby",
        isEmployee: true,
        isActive: true,
        img_url: "https://i0.wp.com/blog.amal.net/wp-content/uploads/2009/07/How-I-Met-Your-Mother-tv-21.jpg",
        startTOD: "8:00",
        endTOD: "17:00",
        userRole: 3
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "vanillaThunder@himym.com",
        firstName: "Marshall",
        lastName: "Eriksen",
        isEmployee: true,
        isActive: true,
        img_url: "https://vignette.wikia.nocookie.net/p__/images/7/75/MarshallMain.jpg/revision/latest?cb=20121126135126&path-prefix=protagonist",
        startTOD: "8:00",
        endTOD: "17:00",
        userRole: 3
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "thegrinch@himym.com",
        firstName: "Lily",
        lastName: "Ericson",
        isEmployee: true,
        isActive: true,
        img_url: "https://vignette.wikia.nocookie.net/p__/images/a/a1/LilyAldrin.jpg/revision/latest?cb=20130201001620&path-prefix=protagonist",
        startTOD: "7:30",
        endTOD: "14:30",
        userRole: 3
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "suitup@himym.com",
        firstName: "Barney",
        lastName: "Stinson",
        isEmployee: false,
        isActive: true,
        img_url: "https://media.gq.com/photos/55828b3f1177d66d68d5287c/master/w_1600,c_limit/blogs-the-feed-how-i-met-your-mother-barney-stinson.jpg",
        startTOD: "8:30",
        endTOD: "17:30",
        userRole: 3
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "auntrobin@himym.com",
        firstName: "Robin",
        lastName: "Scherbatsky",
        isEmployee: false,
        isActive: true,
        img_url: "https://vignette.wikia.nocookie.net/loveinterest/images/4/48/Robin-robin-scherbatsky-29437383-1920-2560-600x800.jpg/revision/latest?cb=20121115061619",
        startTOD: "8:00",
        endTOD: "17:00",
        userRole: 3
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "ranjitsingh@himym.com",
        firstName: "Ranjit",
        lastName: "Singh",
        isEmployee: true,
        isActive: true,
        img_url: "https://cc-media-foxit.fichub.com/image/fox-it-mondofox/5b9bc6f2-f403-4561-abaa-ae59351605a3/ranjit-lautista-di-how-i-met-your-mother-maxw-1280.jpg",
        startTOD: "16:00",
        endTOD: "02:00",
        userRole: 3
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "circleofscreaming@himym.com",
        firstName: "Arthur",
        lastName: "Hobbs",
        isEmployee: true,
        isActive: true,
        img_url: "https://vignette.wikia.nocookie.net/himym/images/d/db/TugboatLandmarks.jpg/revision/latest?cb=20111211122247",
        startTOD: "8:00",
        endTOD: "17:00",
        userRole: 3
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "ihategaryblauman@himym.com",
        firstName: "Gary",
        lastName: "Blauman",
        isEmployee: true,
        isActive: true,
        img_url: "http://3.bp.blogspot.com/-R22xS4BN570/Uyjo1mZcumI/AAAAAAAAA1E/6U--9weAZkc/s1600/Untitled-4.jpg",
        startTOD: "10:00",
        endTOD: "18:00",
        userRole: 3
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "bartender@himym.com",
        firstName: "Carl",
        lastName: "McLaren",
        isEmployee: true,
        isActive: true,
        img_url: "http://s3cf.recapguide.com/img/tv/23/8x20/How-I-Met-Your-Mother-Season-8-Episode-20-34-90d5.jpg",
        startTOD: "8:00",
        endTOD: "16:00",
        userRole: 3
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "numberonedad@himym.com",
        firstName: "Marvin",
        lastName: "Eriksen",
        isEmployee: true,
        isActive: true,
        img_url: "https://iv1.lisimg.com/image/14186885/640full-marvin-eriksen-sr..jpg",
        startTOD: "8:00",
        endTOD: "16:00",
        userRole: 3
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "ashmohney@gmail.com",
        firstName: "Ash",
        lastName: "Mohney",
        isEmployee: true,
        isActive: true,
        startTOD: "8:00",
        endTOD: "16:00",
        userRole: 2
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "mtfear@hotmail.com",
        firstName: "Mike",
        lastName: "Fearnley",
        isEmployee: true,
        isActive: true,
        startTOD: "8:00",
        endTOD: "16:00",
        userRole: 2
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "seamusmurchadh@gmail.com",
        firstName: "Seamus",
        lastName: "Murphy",
        isEmployee: true,
        isActive: true,
        startTOD: "8:00",
        endTOD: "16:00",
        userRole: 2
      },
      {
        createdAt: new Date(),
        updatedAt: new Date(),
        email: "jasonbeisiegel@gmail.com",
        firstName: "Jason",
        lastName: "Beisiegel",
        isEmployee: true,
        isActive: true,
        startTOD: "8:00",
        endTOD: "16:00",
        userRole: 2
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    */
  }
};
