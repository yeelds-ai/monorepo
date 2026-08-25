import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Pagination } from "../components/pagination";

const meta = {
    title: "Input/Pagination",
    component: Pagination,
    tags: ["autodocs"],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof Pagination>;

const LABELS = {
    firstPage: "First page",
    previousPage: "Previous page",
    nextPage: "Next page",
    lastPage: "Last page",
};

function ControlledPagination({
    totalPages,
    initialPage = 1,
}: {
    totalPages: number;
    initialPage?: number;
}) {
    const [page, setPage] = useState(initialPage);

    return (
        <Pagination
            page={page}
            totalPages={totalPages}
            labels={{
                ...LABELS,
                showing: `Showing ${page} of ${totalPages} (${totalPages * 20} opportunities)`,
            }}
            onPageChange={setPage}
        />
    );
}

export const Base: Story = {
    render: () => <ControlledPagination totalPages={8} />,
};

export const FirstPage: Story = {
    render: () => <ControlledPagination totalPages={8} initialPage={1} />,
};

export const LastPage: Story = {
    render: () => <ControlledPagination totalPages={8} initialPage={8} />,
};
