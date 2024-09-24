// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `sudoku_${name}`);

export const puzzles = createTable(
  "puzzles",
  {
    id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    puzzle: text("puzzle").notNull(),
    solution: text("solution").notNull(),
  },
  (puzzle) => ({
    idIndex: index("id_idx").on(puzzle.id),
  })
);
