type Symbol = "X" | "O" | " "

export class Game {
    private _lastSymbol: Symbol = ' ';
    private _board: Board = new Board();

    public Play(symbol: Symbol, x: number, y: number) : void {
        const firstMove = this._lastSymbol === ' ';
        if (firstMove && symbol === 'O') {
            throw new Error("Invalid first player");
        }

        const repeatedMove = symbol === this._lastSymbol;
        if (repeatedMove) {
            throw new Error("Invalid next player");
        }

        const tileUsed = this._board.SymbolAt(x, y) !== ' ';
        if (tileUsed) {
            throw new Error("Invalid position");
        }

        this._lastSymbol = symbol;
        this._board.AddTileAt(symbol, x, y);
    }

    public Winner() : Symbol {

        for (let i = 0; i < 3; i++) {
            if (this._board.SymbolAt(i, 0) != ' ' &&
                this._board.SymbolAt(i, 1) != ' ' &&
                this._board.SymbolAt(i, 2) != ' ') {
                if (this._board.SymbolAt(i, 0) ==
                        this._board.SymbolAt(i, 1) &&
                        this._board.SymbolAt(i, 2) == this._board.SymbolAt(i, 1)) {
                    return this._board.SymbolAt(i, 0);
                }
            }
        }

        return ' ';
    }
}

interface Tile
{
    X: number;
    Y: number;
    Symbol: Symbol;
}

class Board
{
    private _plays : Tile[] = [];

    constructor()
    {
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                const tile : Tile = {X :i, Y:j, Symbol:" "};
                this._plays.push(tile);
            }
        }
    }

    private TileAt(x:number, y: number): Tile {
        const tile = this._plays.find((t:Tile) => t.X == x && t.Y == y);

        if (!tile)
            throw new Error("Invalid Tile");

        return tile;
    }

    public SymbolAt(x: number, y: number): Symbol {
        return this.TileAt(x,y).Symbol;
    }

    public AddTileAt(symbol: Symbol, x: number, y: number) : void
    {
        this.TileAt(x, y).Symbol = symbol;
    }
}
