
import echo from './echo/echo'

export class TransmuteCLI {
    echo = echo
}

const instance = new TransmuteCLI()

export default instance