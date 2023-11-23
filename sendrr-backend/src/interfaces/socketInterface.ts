export interface SocketData{
    ip: string,
    deviceName: string,
    socketId: string,
    username: string,
    code: string,
    codeCreator: Boolean,
    devices: String[]
}

export interface Sendrr{
    content: string,
    socketId: string,
    receiverUsername: string,
    senderUsername: string
}