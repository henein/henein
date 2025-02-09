import { redirect } from 'next/navigation';
import { use } from 'react';

interface Props {
  params: Promise<{ uid: string }>;
}

const UserPage = ({ params }: Props) => {
  const { uid } = use(params);
  redirect(`/user/${uid}/post`);
};

export default UserPage;
