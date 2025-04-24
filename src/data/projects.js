import { desc } from "framer-motion/client";

const projects = [
    {
      id: '001-reel-forasteira',
      title: 'Reel Forasteira',
      videoSrc: '/videos/quemsomos.mp4',
      thumbnailAlt: 'Reel Forasteira',
      fullProjectLink: '/projects/001-reel-forasteira',
      customWidth: '30%',
      aspectRatio: '16/9',
      description: 'A captivating reel showcasing the essence of Forasteira.',
      order: 1,
      credits: [
        { role: "Owner", name: "Lua Hora" },
        { role: "Role 2", name: "Name" },
        { role: "Role 3", name: "Name" },
        { role: "Role 4", name: "Name" },
      ]
    },
    {
      id: '002-digital-vibes',
      title: 'Digital Vibes',
      videoSrc: '/videos/videoplayback.mp4',
      thumbnailAlt: 'Digital Vibes',
      fullProjectLink: '/projects/002-digital-vibes',
      customWidth: '35%',
      aspectRatio: '16/9',
      order: 2,
      credits: [
        { role: "Role", name: "Name" },
        { role: "Role", name: "Name" },
        { role: "Role", name: "Name" },
        { role: "Role", name: "Name" },
      ]
    },
    {
        id: '003-honey-mustard',
        title: 'Digital Vibes',
        videoSrc: '/videos/videoplayback.mp4',
        thumbnailAlt: 'Honey Mustard',
        fullProjectLink: '/projects/003-honey-mustard',
        customWidth: '35%',
        aspectRatio: '16/9',
        order: 3,
        credits: [
          { role: "Director", name: "Hilary Hilton" },
          { role: "Lead Designer", name: "Barry Oldman" },
          { role: "Anchor", name: "Fernando da Silva" },
          { role: "Waterboy", name: "Brad Pitt" },
        ]
      },
  ];
  
  export default projects;
  