import { makeMiddleware, authMiddleware } from "../../../utils/middlewares";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    getUserProfile: makeMiddleware(
      authMiddleware,
      async (
        parent,
        { id }: { id: number },
        { entities: { User } }
      ): Promise<object> => {
        const user = await User.findOne(id);
        if (user) {
          return {
            ok: true,
            user
          };
        } else {
          return {
            ok: false,
            error: `Could not find a user with the id ${id}`
          };
        }
      }
    )
  }
};

export default resolvers;
