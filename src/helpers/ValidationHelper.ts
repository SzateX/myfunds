import BadRequestResponse from "@/models/validations/BadRequestResponse";

export function GetStringsFromValidationResponse(response: BadRequestResponse): string[]
{
    let output: string[] = [];

    if (response.ValidationErrors !== undefined)
    {
        for (let i in response.ValidationErrors)
        {
            const entry = response.ValidationErrors[i];
            if (entry && entry.Description)
            {
                output.push(entry.Description);
            }
        }
    }

    return output;
}