import { request, GraphQLClient } from "graphql-request";

const endpoint = process.env.WES_GQL;

const client = new GraphQLClient(endpoint, { headers: {} });

export const errorReport = (size = 100) =>
  client.request(`
{
    runs(page: {from: 0, size: ${size}}, filter: {state: "EXECUTOR_ERROR"}) {
        runName
        state
        completeTime
    }
}
`);
