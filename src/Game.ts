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

        const tileUsed = this._board.TileAt(x, y).Symbol !== ' ';
        if (tileUsed) {
            throw new Error("Invalid position");
        }

        this._lastSymbol = symbol;
        this._board.AddTileAt(symbol, x, y);
    }

    public Winner() : Symbol {
        if (this._board.TileAt(0, 0).Symbol != ' ' &&
                this._board.TileAt(0, 1).Symbol != ' ' &&
                this._board.TileAt(0, 2).Symbol != ' ') {
            if (this._board.TileAt(0, 0).Symbol ==
                    this._board.TileAt(0, 1).Symbol &&
                    this._board.TileAt(0, 2).Symbol == this._board.TileAt(0, 1).Symbol) {
                return this._board.TileAt(0, 0).Symbol;
            }
        }

        if (this._board.TileAt(1, 0).Symbol != ' ' &&
                this._board.TileAt(1, 1).Symbol != ' ' &&
                this._board.TileAt(1, 2).Symbol != ' ') {
            if (this._board.TileAt(1, 0).Symbol ==
                    this._board.TileAt(1, 1).Symbol &&
                    this._board.TileAt(1, 2).Symbol ==
                            this._board.TileAt(1, 1).Symbol) {
                return this._board.TileAt(1, 0).Symbol;
            }
        }

        if (this._board.TileAt(2, 0).Symbol != ' ' &&
                this._board.TileAt(2, 1).Symbol != ' ' &&
                this._board.TileAt(2, 2).Symbol != ' ') {
            if (this._board.TileAt(2, 0).Symbol ==
                    this._board.TileAt(2, 1).Symbol &&
                    this._board.TileAt(2, 2).Symbol ==
                            this._board.TileAt(2, 1).Symbol) {
                return this._board.TileAt(2, 0).Symbol;
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

    public TileAt(x: number, y: number): Tile {
        const tile = this._plays.find((t:Tile) => t.X == x && t.Y == y);

        if (!tile)
            throw new Error("Invalid Tile");

        return tile;
    }

    public AddTileAt(symbol: Symbol, x: number, y: number) : void
    {
        this.TileAt(x, y).Symbol = symbol;
    }
}
