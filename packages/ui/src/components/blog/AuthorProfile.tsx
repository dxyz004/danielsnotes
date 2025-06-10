import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

export function AuthorProfile() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="Author avatar" />
      <AvatarFallback>DN</AvatarFallback>
    </Avatar>
  );
}
