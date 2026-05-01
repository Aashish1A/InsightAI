import ImageKit from "@imagekit/nextjs";

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export default imageKit;