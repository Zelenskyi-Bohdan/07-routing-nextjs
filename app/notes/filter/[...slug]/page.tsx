import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import Notes from './Notes.client';
import { NoteTag } from '@/types/note';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const rawCategory = slug?.[0];

  const category: NoteTag | undefined =
    !rawCategory || rawCategory === 'all' ? undefined : (rawCategory as NoteTag);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, category],
    queryFn: () => fetchNotes('', 1, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={category} />
    </HydrationBoundary>
  );
}