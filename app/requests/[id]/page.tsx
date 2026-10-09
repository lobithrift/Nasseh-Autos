import { redirect } from 'next/navigation';

export default function RequestPageRedirect() {
  redirect('/inventory');
}
