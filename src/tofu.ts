export function tofu(
  template: string, // the template string
  data: Record<string, unknown> // the values
): string {
  return template.replace(
    /{ *([^} ]+) *}/g, // searches for { variable_name } to replace
    function (
      // the replacer function
      match: string, // no use here. it holds the entire "{ variable_name }" string
      key: string // we will use this instead, it holds "variable_name"
    ): string {
      let value: unknown = data; // re-assign the placeholder to values
      key.replace(/[^.]+/g, function (subKey: string): string {
        // find all the key names
        value = (value as Record<string, unknown>)[subKey]; // one by one until it's reduced to the one we are looking for
        return subKey; // return subKey to avoid TypeScript error
      });
      return String(value); // return this value to be replaced
    }
  );
}
