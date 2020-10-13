/**
 * Clase Dispositivo
 * @property _clientId: string
 * @property _dispositivoId: number
 * @property _nombre: string
 * @property _ubicacion: string
 * @property _habilitado: number
 * @property _electrovalvulaId: number
 */
export class Dispositivo {
    private _clientId: string;
    private _dispositivoId: number;
    private _nombre: string;
    private _ubicacion: string;
    private _habilitado: boolean;
    private _electrovalvulaId: number;

    constructor(clientId: string, dispId: number, nombre: string, ubicacion: string, habilitado: boolean, electovalId: number) {
        this._clientId = clientId;
        this._dispositivoId = dispId;
        this._nombre = nombre;
        this._ubicacion = ubicacion;
        this._habilitado = habilitado;
        this._electrovalvulaId = electovalId;
    }
    public get clientId(): string {
        return this._clientId;
    }
    public set clientId(value: string) {
        this._clientId = value;
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
    public get habilitado(): boolean {
        return this._habilitado;
    }
    public set habilitado(value: boolean) {
        this._habilitado = value;
    }
    public get electrovalvulaId() {
        return this._electrovalvulaId;
    }
    public set electrovalvulaId(value) {
        this._electrovalvulaId = value;
    }
}