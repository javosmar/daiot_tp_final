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
    private _temp: number;
    private _hum: number;
    // private _valor: number;
    private _dispositivoId: number;

    constructor(medId: number, fecha: string, temp: number, hum: number, dispId: number){
        this._medicionId = medId;
        this._fecha = fecha;
        this._temp = temp;
        this._hum = hum;
        // this._valor = valor;
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
    public get temp(): number {
        return this._temp;
    }
    public set temp(value: number) {
        this._temp = value;
    }
    public get hum(): number {
        return this._hum;
    }
    public set hum(value: number) {
        this._hum = value;
    }
    /* public get valor(): number {
        return this._valor;
    }
    public set valor(value: number) {
        this._valor = value;
    } */
    public get dispositivoId(): number {
        return this._dispositivoId;
    }
    public set dispositivoId(value: number) {
        this._dispositivoId = value;
    }
}