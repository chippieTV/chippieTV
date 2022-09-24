import {z} from "zod";

const dateSchema = z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date());

// type DateSchema = z.infer<typeof dateSchema>;

// type tags = "web" | "design" | "programming" | "fashion" | "Savile Row";
const projectType = z.enum(["web", "general", "graphics", "iOS", "photography"]);

const imageSchema = z.object({
    filename: z.string(),
    description: z.string(),
    width: z.optional(z.string()),
    height: z.optional(z.string()),
});

const projectSchema = z.object({
    project_id: z.string(),
    project_title: z.string(),
    project_description_s: z.string(),
    start: z.string(), // date string like Oct 07, 2013 .. update to ISO?
    type: projectType,
    url: z.optional(z.string()),
    images: z.optional(z.array(imageSchema))

});

const clientSchema = z.object({
    client_name: z.string(),
    client_description_s: z.string(),
    client_description_l: z.string(),
    tags: z.array(z.string()),
    projects: z.array(projectSchema)
});

export const cvSchema = z.object({
    Config: z.object({
        startDate: z.string()
    }),
    Clients: z.record(clientSchema)
});

export type CV = z.infer<typeof cvSchema>;

export type Client = z.infer<typeof clientSchema>;
export type Project = z.infer<typeof projectSchema>;