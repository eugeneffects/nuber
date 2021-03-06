import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { GetPlaceResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import { authMiddleware, makeMiddleware } from "../../../utils/middlewares";

interface IArgs {
  placeId: number;
}

const resolvers: Resolvers = {
  Query: {
    getPlace: makeMiddleware(
      authMiddleware,
      async (_, { placeId }: IArgs, { req }): Promise<GetPlaceResponse> => {
        const { user }: { user: User } = req;
        const place: Place | undefined = await Place.findOne({
          id: placeId,
          user
        });
        if (place) {
          return {
            ok: true,
            place,
            error: null
          };
        } else {
          return {
            ok: false,
            place: null,
            error: "Couldn't find place"
          };
        }
      }
    )
  }
};
export default resolvers;
