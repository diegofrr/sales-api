import handlebars from 'handlebars';

interface ITemplateVariabel {
    [key: string]: string | number;
}

export interface IParseMailTemplate {
    template: string;
    variables: ITemplateVariabel;
}

export default class HandlebarsMailTemplate {
    public async parse({
        template,
        variables,
    }: IParseMailTemplate): Promise<string> {
        const parseTemplate = handlebars.compile(template);

        return parseTemplate(variables);
    }
}
