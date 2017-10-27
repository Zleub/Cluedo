# @Author: Debray Arnaud <adebray>
# @Date:   2017-09-25T19:42:42+02:00
# @Email:  adebray@student.42.fr
# @Last modified by:   adebray
# @Last modified time: 2017-09-26T23:58:01+02:00

all:
	rm -f client/bower_components
	ln -s ../bower_components client/bower_components
	rsync -avz client/ build/
	$(shell hash m4 || { echo -e 'm4 not found' ; exit } )
	make m4

m4:
	$(foreach file,$(shell ls build/*.html), \
		sed -i "" '1s/^/include(conf.m4) /' $(file); \
		m4 $(file) > $(file).m4; \
		mv $(file).m4 $(file); \
	)
	$(foreach file,$(shell ls build/elements/*.html), \
		sed -i "" '1s/^/include(conf.m4) /' $(file); \
		m4 $(file) > $(file).m4; \
		mv $(file).m4 $(file); \
	)

serve:
	@echo client: http://localhost:8080 
	node server/main.js --hostname localhost --port 8081 &

kill: # until a better alternative
	$(shell kill `lsof -ti:8081`)

re:
	rm -rf build
	make all
