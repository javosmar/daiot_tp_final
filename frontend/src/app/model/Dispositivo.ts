/**
 * Clase Dispositivo
 * @property _dispositivoId: number
 * @property _nombre: string
 * @property _ubicacion: string
 * @property _electrovalvulaId: number
 */
export class Dispositivo {
    private _dispositivoId: number;
    private _nombre: string;
    private _ubicacion: string;
    private _electrovalvulaId: number;

    constructor(dispId: number, nombre: string, ubicacion: string, electovalId: number) {
        this._dispositivoId = dispId;
        this._nombre = nombre;
        this._ubicacion = ubicacion;
        this._electrovalvulaId = electovalId;
    }
    public get dispositivoId() {
        return this._dispositivoId;
    }
    public set dispositivoId(value) {
        this._dispositivoId = value;
    }
    public get nombre() {
        return this._nombre;
    }
    public set nombre(value) {
        this._nombre = value;
    }
    public get ubicacion() {
        return this._ubicacion;
    }
    public set ubicacion(value) {
        this._ubicacion = value;
    }
    public get electrovalvulaId() {
        return this._electrovalvulaId;
    }
    public set electrovalvulaId(value) {
        this._electrovalvulaId = value;
    }



}