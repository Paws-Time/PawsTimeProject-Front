import { defineConfig } from "orval";

export default defineConfig({
  pawsTime: {
    input: "app/lib/codegen/schema.json",
    output: {
      client: "react-query",
      target: "app/lib/codegen/hooks", // 생성될 hook들의 경로
      schemas: "app/lib/codegen/dtos", // 생성될 type들의 경로
      mode: "tags-split",
      prettier: true,

      override: {
        query: {
          useQuery: true,
          useInfinite: true,
          useMutation: true,
        },
        mutator: {
          path: "app/lib/axios-client/customClient.ts",
          name: "customInstance",
        },
      },
    },
  },
});
