from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', active_page='home')

@app.route('/servicos')
def servicos():
    return render_template('servicos.html', active_page='servicos')

@app.route('/sobre')
def sobre():
    return render_template('sobre.html', active_page='sobre')

@app.route('/contacto')
def contacto():
    return render_template('contacto.html', active_page='contacto')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
