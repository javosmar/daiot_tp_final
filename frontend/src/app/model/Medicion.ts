/**
 * Clase Medición
 * @property _medicionId: number
 * @property _fecha: string
 * @property _valor: number
 * @property _dispositivoId: number
 */
export class Medicion {
    private _medicionId: number;
    private _fecha: string;
    private _valor: number;
    private _dispositivoId: number;

    constructor(medId: number, fecha: string, valor: number, dispId: number){
        this._medicionId = medId;
        this._fecha = fecha;
        this._valor = valor;
        this._dispositivoId = dispId;
    }

    public get medicionId(): number {
        return this._medicionId;
    }
    public set medicionId(value: number) {
        this._medicionId = value;
    }
    public get fecha(): string {
        return this._fecha;
    }
    public set fecha(value: string) {
        this._fecha = value;
    }
    public get valor(): number {
        return this._valor;
    }
    public set valor(value: number) {
        this._valor = value;
    }
    public get dispositivoId(): number {
        return this._dispositivoId;
    }
    public set dispositivoId(value: number) {
        this._dispositivoId = value;
    }
}