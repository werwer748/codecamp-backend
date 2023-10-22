import { ApolloServer } from "@apollo/server"; // express와 같은 역할
import { startStandaloneServer } from "@apollo/server/standalone"; // listen

const typeDefs = `#graphql
  input CreateBoardInput { # input type은 반드시 input으로 시작해야 한다.
    writer: String
    title: String
    content: String
  }

  type MyResult {
    number: Int
    writer: String
    title: String
    content: String
  }

    type Query {
      # fetchBoards: MyResult # 객체 1개를 의미
      fetchBoards: [MyResult] # 배열 안에 객체 1개 이상을 의미한다.
    }

    type Mutation {
      # createBoard(writer: String, title: String, content: String!): String # 기본적인 사용법, !는 필수값
      createBoard(createBoardInput: CreateBoardInput!): String
    }
`;

const resolvers = {
  Query: {
    fetchBoards: (parent, args, context, info) => {
      const result = [
        {
          number: 1,
          writer: "철수",
          title: "제목임당~~~",
          content: "게시글 내용 이에요~!",
        },
        {
          number: 1,
          writer: "짱구",
          title: "제목이야",
          content: "부리부리부리",
        },
        {
          number: 1,
          writer: "유리",
          title: "훈아...",
          content: "V^^...!",
        },
      ];

      return result;
    },
  },
  Mutation: {
    // createBoard: (parent, args, context, info) => {
    //여기서 fetchBoards("01012345678")를 호출 => parent로 데이터가 들어감
    createBoard: (_, args) => {
      // 파라미터를 _로 받으면 사용하지 않겠다는 의미
      // 1. 브라우저에서 보내준 데이터 확인하기
      console.log(args.createBoardInput.writer);
      console.log(args.createBoardInput.title);
      console.log(args.createBoardInput.content);

      // 2. DB에 접속 후, 데이터를 저장 (아직은 저장했다고 가정)

      // 3. DB에 저장된 결과를 브라우저에 응답(response) 주기
      return "게시물 등록에 성공하였습니다.";
    },
  },
};

const server = new ApolloServer({
  typeDefs, // swagger
  resolvers, // api
  cors: true, // 모든 사이트 cors 허용
  // cors: { origin: ["https://naver.com", "https://daum.net"]} // 특정 사이트만 cors 허용
});

startStandaloneServer(server);
