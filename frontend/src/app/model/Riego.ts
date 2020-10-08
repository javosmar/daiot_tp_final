/**
 * Clase Riego
 * @property _apertura: number
 * @property _fecha: string
 */
export class Riego {
    private _apertura: number;
    private _fecha: string;

    constructor(apertura: number, fecha: string){
        this._apertura = apertura;
        this._fecha = fecha;
    }

    public get apertura(): number {
        return this._apertura;
    }
    public set apertura(value: number) {
        this._apertura = value;
    }
    public get fecha(): string {
        return this._fecha;
    }
    public set fecha(value: string) {
        this._fecha = value;
    }
}