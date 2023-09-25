export class BuiltInUsernamesUtils {
   public static readonly USERNAMES = {
      MISSING: "Unknown user",
      DEFAULT: "Anonymous"
   };

   public static getAll(): string[] {
      return Object.values(this.USERNAMES);
   }
}
