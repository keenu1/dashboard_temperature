// __mocks__/socket.io-client.js
export const io = jest.fn(() => {
    return {
        on: jest.fn(),
        emit: jest.fn(),
        disconnect: jest.fn(),
    };
});
