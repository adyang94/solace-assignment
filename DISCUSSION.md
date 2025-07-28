Due to limited time, there were some additional improvements that were not implemented:

## Additional frontend improvements:

- Consider integrating React Hook Form or a similar library for better form state handling, validation, and accessibility. Currently, this is a simple form, but as it continues to grow, mananging form state and validation will become more complex, and can benefit from a library with built-in features.
- Add snapshot tests to ensure the frontend components render correctly.
- Use global CSS classes and files to maintain consistency and maintainability of styles across the application.
- Improve centralized logging
- Server side prefetching of advocates list to improve SEO and hydrating react query for the client to reduce redundant requests. 

## Additional backend improvements:

- Add unit or integration tests for the API routes and functions.
- Create more robust contracts for API requests and responses schemas.
- For searching through specialties, I would adjust the data models so that we can support searching through specialties more effectively. Currently, the specialties are stored as a JSONB array, which can be difficult to query efficiently, duplicates data, and makes it hard to enforce data integrity. Instead, I would consider normalizing the data by creating a separate table for specialties and linking it to the advocates table with a many-to-many relationship. This would allow for more efficient querying and indexing.

## Additional database improvements:

- Consider enumerated values or a look up table for specialties in the database. A look up table would allow for more data to be associated with each specialty, such as descriptions or additional metadata if needed.
- Consider using enumerated values for the Degree property in database for Advocates.
- For more advanced search capabilities, we can add additional indexes to the database to improve full text search capabilities. If we want to expand past the full text search into more complex features, we can consider services like Elasticsearch or using a vector database depending on the needs of the application.
