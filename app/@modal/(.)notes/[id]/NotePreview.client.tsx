"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { fetchNoteById } from "@/lib/api";
import css from './NotePreview.module.css';
import Modal from "@/components/Modal/Modal";

type NotePreviewClientProps = {
  id: string
};

const NotePreviewClient = ({ id }: NotePreviewClientProps) => {
    const router = useRouter();
    const close = () => router.back();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
    
    return (
        <Modal onClose={close}>
        {isLoading && <p>Loading, please wait...</p>}

        {error && !note && <p>Something went wrong.</p>}

            {note &&
                <div className={css.container}>
                    <div className={css.item}>
                        <div className={css.header}>
                            <h2>{note?.title}</h2>
                        </div>
                        <p className={css.tag}>{note?.tag}</p>
                        <p className={css.content}>{note?.content}</p>
                        <p className={css.date}>{note?.createdAt}</p>
                    </div>
                </div>
            }
        </Modal>
  );
};

export default NotePreviewClient;