import { H3Event } from 'h3';
import { fromZodError } from 'zod-validation-error';

export async function getValidatedBody(event: H3Event, schema: any) {
  const validatedBody = await readValidatedBody(event, schema.safeParse);
  if (!validatedBody.success) throw fromZodError(validatedBody.error);
  return validatedBody.data;
}
export async function getValidatedQueryData(event: H3Event, schema: any) {
  const validatedQuery = await getValidatedQuery(event, (query) =>
    schema.safeParse(query),
  );
  if (!validatedQuery.success) throw fromZodError(validatedQuery.error);
  return validatedQuery.data;
}
