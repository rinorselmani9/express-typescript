import bcrypt from 'bcrypt'

class Bcrypt {
    private saltRounds = 10;

    public async hash(input:string | Buffer ){
        return await bcrypt.hash(input, this.saltRounds)
    }

    public async compare(input: string | Buffer , encrypted: string){
        return await bcrypt.compare(input, encrypted)
    }
}

export default new Bcrypt()