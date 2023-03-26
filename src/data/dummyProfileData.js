import dummyAvatar from "assets/images/dummy_images/userCard/avatar.jpeg";
import dummyCover from "assets/images/dummy_images/dummy_cover.jpg";

export const userSelfData = {
  id: "user0001",
  user_id: "user0001",
  account: "tina2023",
  name: "Tina",
  avatar: dummyAvatar,
  cover_img: dummyCover,
  tweet_count: 15000,
  following_count: 10,
  follower_count: 10,
  introduction:
    "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ",
};
export const tweetsData = [
  {
    id: "tweet0001",
    create_at: "2023-01-02",
    content:
      "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    user: {
      name: "Anna",
      account: "anna2003",
      avatar: dummyAvatar,
    },
  },
  {
    id: "tweet0002",
    create_at: "2023-01-02",
    content:
      "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
    user: {
      name: "Anna",
      account: "anna2003",
      avatar: dummyAvatar,
    },
  },
];

export const replyData = [
  {
    id: "reply0001",
    create_at: "2023-01-02",
    tweet: {
      id: "tweet0001",
      user :{
        id:'user0001',
        account:'apple2023'
      },
      content:
        "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",

    },
    user: {
      name: "Anna",
      account: "anna2003",
      avatar: dummyAvatar,
    },
  },
  {
    id: "reply0002",
    create_at: "2023-01-02",
    tweet: {
      id: "tweet0001",
      user :{
        id:'user0001',
        account:'apple2023'
      },
      content:
        "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",

    },
    user: {
      name: "Anna",
      account: "anna2003",
      avatar: dummyAvatar,
    },
  },
];

export const likesData =[
    {
        id:'0001',
        isLike:true,
        tweet: {
            id: "tweet0001",
            user :{
              id:'user0001',
              account:'apple2023'
            },
            content:
              "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
      
          },
        user: {
            name: "Anna",
            account: "anna2003",
            avatar: dummyAvatar,
          },
    },
    {
        id:'0001',
        isLike:true,
        tweet: {
            id: "tweet0001",
            user :{
              id:'user0001',
              account:'apple2023'
            },
            content:
              "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
      
          },
        user: {
            name: "Anna",
            account: "anna2003",
            avatar: dummyAvatar,
          },
    }
]