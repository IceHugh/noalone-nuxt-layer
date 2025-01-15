// import { z } from 'zod';
// import { fromZodError } from 'zod-validation-error';
// import { Sat20Client } from '~ui/utils/api';

// const ListSchema = z.object({
//   address: z.string(),
//   network: z.string().default('livenet'),
//   start: z
//     .string()
//     .transform((val) => {
//       const parsed = Number(val);
//       if (isNaN(parsed)) {
//         throw new Error('Invalid number');
//       }
//       return parsed;
//     })
//     .pipe(z.number().min(0))
//     .default('0'),
//   limit: z
//     .string()
//     .transform((val) => {
//       const parsed = Number(val);
//       if (isNaN(parsed)) {
//         throw new Error('Invalid number');
//       }
//       return parsed;
//     })
//     .pipe(z.number().min(1).max(1000))
//     .default('10'),
// });
// export default defineEventHandler(async (event) => {
//   const validatedQuery = await getValidatedQuery(event, (query) =>
//     ListSchema.safeParse(query),
//   );

//   if (!validatedQuery.success) throw fromZodError(validatedQuery.error);
//   const query = validatedQuery.data;
//   try {
//     const client = new Sat20Client(query.network);
//     const result = await client.getNameList({
//       address: query.address,
//       start: query.start,
//       limit: query.limit,
//     });
//     if (result.code === 0) {
//       return {
//         code: 200,
//         message: 'success',
//         data: {
//           list: result.data.names,
//           total: result.data.total,
//         },
//       };
//     } else {
//       throw new Error(result.message);
//     }
//   } catch (error: any) {
//     throw error;
//   }
// });
