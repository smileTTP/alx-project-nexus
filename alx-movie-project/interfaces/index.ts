import { ReactNode } from "react";

export interface ComponentProps {
    children: ReactNode
}

export interface MovieProps {
    id: number;
    genre_ids: number[];

}