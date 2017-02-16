System.config({
    // use typescript for compilation
    transpiler: 'typescript',
    // typescript compiler options
    typescriptOptions: {
        emitDecoratorMetadata: true
    },
    paths: {
        'npm:': 'https://unpkg.com/'
    },
    // map tells the System loader where to look for things
    map: {
        'app': './src',
        'rxjs': 'npm:rxjs',
        'typescript': 'npm:typescript@2.0.2/lib/typescript.js'
    },
    // packages defines our app package
    packages: {
        app: {
            main: './demo.ts',
            defaultExtension: 'ts'
        },
        rxjs: {
            defaultExtension: 'js'
        }
    }
});