export enum Gender { Male = 1, Female, Others }
export enum PaymentThrough { bKash = 1, Rocket, Nagad, uPay, CreditOrDebit, Cash }
export enum PaymentFor { Ticket, Pavilion, Parking }
export enum BookingStatus { Confirmed = 1, Pending, Cancelled, Expired, Unavailable }
export enum PavilionType { Rectangular = 1, Square, Octagonal, Circular }
export enum VehicleType { Car = 1, Bike, MiniTruck, CNG }
export const apiUrl = 'http://localhost:5195';
export const navItems = [
  {
    label: 'Home',
    icon: 'home',
    link: '/home',
  },
  {
    label: 'Pavilion',
    icon: 'store',
    link: '/pavilions',
  },
  {
    label: 'Exhibitors',
     icon: 'museum',
         items: [
      {
        label: 'Exhibitor List',
        link: '/exhibitors',
      
      },
      {
        label: 'Fair Pass',
        link: '/entry-exit',
       
      }
    ]
   
  },
  
  // {
  //   label: 'Galleries',
  //   icon: 'photo_library',
  //   items: [
  //     {
  //       label: 'Photo Gellary',
  //       link: '/photos',
  //       icon: 'image'
  //     },
  //     {
  //       label: 'Video Gellary',
  //       link: '/videos',
  //       icon: 'play_circle'
  //     }
  //   ]
  // },
  {
    label: 'Tickets',
    icon: 'book_online',
    link: '/tickets'
  },
  {
    label: 'Events',
    icon: 'event',
    link: '/events'
    // items: [
    //   {
    //     label: 'Event List',
    //     link: '/eventlsits',
    //     icon: 'event_available'
    //   },
    //   {
    //     label: 'Event Matrix',
    //     link: '/event-matrix',
    //     icon: 'stadium'
    //   }
    // ]
  },
  {
    label: 'Parking',
    icon: 'garage_home',
    link: '/parking'
  },
  {
    label: 'About',
    icon: 'info',
    items: [
      {
        label: 'Trade Fair',
        link: '/tradefair',
       
      },
      {
        label: 'Venue',
        link: '/venue',
       
      }
  
    ]
  },
  

 
  {
    label: 'Sponsor',
    icon: 'handshake',
    link: '/sponsors'
  },
  {
    label:'Organizer',
    icon:'diversity_3',
    link:'/organizers'
  },

  {
    label:'StaffDetail',
    icon:'groups',
    link:'/staffDetails'
  },

]
