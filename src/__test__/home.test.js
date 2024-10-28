import { render, screen, waitFor, act } from "@testing-library/react";
import Home from "@/pages/index"; // Adjust if Home is in a different path
import { io } from "socket.io-client";

// Mock Socket.IO client
jest.mock("socket.io-client");
jest.mock('recharts', () => {
    const OriginalModule = jest.requireActual('recharts');
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }) => (
            <OriginalModule.ResponsiveContainer width={800} height={800}>
                {children}
            </OriginalModule.ResponsiveContainer>
        ),
    };
});

describe("Home Component with Socket.IO", () => {
    let socketMock;

    beforeEach(() => {
        socketMock = { on: jest.fn(), emit: jest.fn(), disconnect: jest.fn() };
        io.mockReturnValue(socketMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("updates chart data when new data arrives via Socket.IO", async () => {
        // Mock initial data being emitted by Socket.IO
        const initialData = {
            status: "true",
            data: [
                { created_at: "2024-10-27T12:00:00Z", value: '99' },
                { created_at: "2024-10-27T13:00:00Z", value: '98' },
            ],
        };

        const { container } = render(<Home data={initialData.data} />);

        // Check initial render
        expect(screen.getByText("Oct 27, 2024, 12:00")).toBeInTheDocument();
        expect(screen.getByText("Oct 27, 2024, 13:00")).toBeInTheDocument();

        // Mock new data being emitted by Socket.IO
        const newData = {
            status: "true",
            data: [
                { created_at: "2024-10-27T14:00:00Z", value: '97' },
                { created_at: "2024-10-27T15:00:00Z", value: '96' },
            ],
        };

        // Trigger the socket event for new data
        await act(async () => {
            const dataHandler = socketMock.on.mock.calls.find(call => call[0] === "timezone_data")[1];
            dataHandler(newData);
        });

        // Wait for the chart to update
        await waitFor(() => {
            expect(screen.getByText("Oct 27, 2024, 14:00")).toBeInTheDocument();
            expect(screen.getByText("Oct 27, 2024, 15:00")).toBeInTheDocument();

        });

        // console.log(container.innerHTML); // Log the current state of the DOM for debugging
    });
});
