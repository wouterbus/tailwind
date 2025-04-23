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
        { role: "Role 1", name: "Name" },
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
      fullProjectLink: '/portfolio/002-digital-vibes',
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
  ];
  
  export default projects;
  